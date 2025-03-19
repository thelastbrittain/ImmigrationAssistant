import os # only needed when running locally
from flask import Flask, request, send_file , url_for
from flask_cors import CORS
from pypdf import PdfReader, PdfWriter
import zipfile
import json
import tempfile
from flask_talisman import Talisman # type: ignore

application = Flask(__name__)
CORS(application, resources={r"/*": {"origins": ["http://immigrationassistant.thelastbrittain.click", "https://immigrationassistant.thelastbrittain.click"], 
                                     "methods": ["GET", "POST", "OPTIONS"], "allow_headers": ["Content-Type"]}})

Talisman(application)

# Load field mappings from a JSON file
@application.before_request
def load_field_mappings():
    print("In before_all")
    # print_project_tree(application.root_path)
    global field_mappings
    # json_mapping_path = url_for("static", filename="formMappings/combined_mappings.json") ## for deployment
    json_mapping_path = os.path.join(application.root_path, "static", "formMappings", "combined_mappings.json") # for local dev
    print(json_mapping_path)
    print()

    with open(json_mapping_path, 'r') as f:
        field_mappings = json.load(f)


@application.route("/test", methods=["GET"])
def test_api():
    return "Application is live!"

@application.route('/')
def health_check():
    return "OK", 200

@application.route('/fill-pdfs', methods=['OPTIONS'])
def handle_preflight():
    response = application.make_response("")
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response

@application.route("/fill-pdfs", methods=["POST"])
def fill_pdfs():
    print("Endpoint hit!")
    user_data = request.json  # Get form data from the request
    print(user_data)

    # Create a temporary ZIP file
    with tempfile.NamedTemporaryFile(suffix=".zip", delete=False) as temp_zip:
        zip_filename = temp_zip.name

        with zipfile.ZipFile(temp_zip.name, 'w') as zipf:
            # Process each PDF in the mapping
            for pdf_template, pdf_fields in field_mappings["pdf_mappings"].items():
                with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_pdf:
                    output_pdf_path = temp_pdf.name

                    fill_pdf(pdf_template, output_pdf_path, pdf_fields, user_data)
                    zipf.write(output_pdf_path, arcname=f"filled_{pdf_template}")

        # Return the ZIP file as a response
        return send_file(zip_filename, as_attachment=True)

def fill_pdf(input_pdf_path, output_pdf_path, pdf_fields, user_data):
    """Fill a single PDF based on its field mappings."""
    # input_pdf_path = url_for("static", filename="formMappings/{input_pdf_path}") ## for deployment
    input_pdf_path = os.path.join(application.root_path, "static", "immigrationPDFs", input_pdf_path) # for local dev
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()
    
    writer.clone_reader_document_root(reader)

    # Map user data to PDF fields
    mapped_fields = {pdf_field: user_data[user_input] for pdf_field, user_input in pdf_fields.items() if user_input in user_data}
    
    for page in writer.pages:
        writer.update_page_form_field_values(page, mapped_fields)

    with open(output_pdf_path, 'wb') as output_file:
        writer.write(output_file)

# def print_project_tree(startpath):
#     for root, dirs, files in os.walk(startpath):
#         level = root.replace(startpath, '').count(os.sep)
#         indent = '  ' * level
#         print('{}{}/'.format(indent, os.path.basename(root)))
#         sub_indent = '  ' * (level + 1)
#         for f in files:
#             print('{}{}'.format(sub_indent, f))

if __name__ == "__main__":
    application.run(debug=True, use_reloader=False)
