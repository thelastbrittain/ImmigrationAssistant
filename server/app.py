from flask import Flask, request, send_file, jsonify
from pypdf import PdfReader, PdfWriter
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/fill-pdf", methods=["POST"])
def fill_pdf():
    # Get form data from the request
    data = request.json

    # Define field mappings for the PDF (example)
    field_mappings = {
        "form1[0].#subform[0].LastName[0]": data.get("lastName", ""),
        "form1[0].#subform[0].FirstName[0]": data.get("firstName", ""),
        "form1[0].#subform[0].MiddleName[0]": data.get("middleName", ""),
        "form1[0].#subform[0].Email[0]": data.get("email", ""),
        "form1[0].#subform[0].MobilePhoneNumber[0]": data.get("mobilePhone", "")
    }

    # Load and modify the PDF
    input_pdf_path = "easyDocuments/g-1145-new.pdf"
    output_pdf_path = "outputDocuments/formTest"
    

    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()
    
    writer.clone_reader_document_root(reader)
    
    for page in writer.pages:
        writer.update_page_form_field_values(page, field_mappings)

    with open(output_pdf_path, "wb") as output_file:
        writer.write(output_file)

    # Return the filled PDF as a response
    return send_file(output_pdf_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
