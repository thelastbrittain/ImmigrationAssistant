from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from pypdf import PdfReader, PdfWriter
import zipfile
import json

app = Flask(__name__)
CORS(app)

# Load field mappings from a JSON file
jsonMappingPath = "/Users/benjaminbrittain/Desktop/SandboxHackathon/server/fieldMappings/combined_mappings.json"
with open(jsonMappingPath, 'r') as f:
    field_mappings = json.load(f)

@app.route("/fill-pdfs", methods=["POST"])
def fill_pdfs():
    print("Endpoint hit!")
    # Get form data from the request
    user_data = request.json
    print(user_data)

    # Prepare a ZIP file to store filled PDFs
    zip_filename = "filled_pdfs.zip"
    i = 0
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        # Process each PDF in the mapping
        for pdf_template, pdf_fields in field_mappings["pdf_mappings"].items():
            output_pdf_path = f"filled_{i}.pdf"
            i += 1
            fill_pdf(pdf_template, output_pdf_path, pdf_fields, user_data)
            zipf.write(output_pdf_path)
            # os.remove(output_pdf_path)  # Clean up individual filled PDFs

    # Return the ZIP file as a response
    return send_file(zip_filename, as_attachment=True)

def fill_pdf(input_pdf_path, output_pdf_path, pdf_fields, user_data):
    """Fill a single PDF based on its field mappings."""
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()
    
    writer.clone_reader_document_root(reader)

    # Map user data to PDF fields
    mapped_fields = {pdf_field: user_data[user_input] for pdf_field, user_input in pdf_fields.items() if user_input in user_data}
    
    for page in writer.pages:
        writer.update_page_form_field_values(page, mapped_fields)

    with open(output_pdf_path, 'wb') as output_file:
        writer.write(output_file)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)


"""
  "/Users/benjaminbrittain/Desktop/SandboxHackathon/server/easyDocuments/Form I-130A.pdf": {
      "Pt1Line1_AlienNumber[0]": "5555",
      "Pt1Line4a_StreetNumberName[0]": "1234",
      "Pt1Line4c_CityOrTown[0]": "Camas",
      "Pt1Line4d_State[0]": "WA",
      "Pt1Line4e_ZipCode[0]": "",
      "Pt1Line4h_Country[0]": "",
      "Pt1Line4g_PostalCode[0]": "",
      "Pt1Line3a_FamilyName[0]": "",
      "Pt1Line3b_GivenName[0]": "",
      "Pt1Line3c_MiddleName[0]": "",
      "Pt1Line1_AlienNumber[1]": ""
"""