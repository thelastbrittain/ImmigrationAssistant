from pypdf import PdfReader
import json

"""
This extracts all the text headers from a pdf document and puts them all nicely into a json document. 
Make sure to run this program by run -> run without debugging. This helps the file paths locate correctly. 
"""

def extract_text_fields(pdf_path):
    # Read the PDF
    reader = PdfReader(pdf_path)
    text_fields = []

    # Get all form fields from the PDF
    fields = reader.get_fields()

    if fields:
        for field_name, field_attributes in fields.items():
            if field_attributes.get("/FT") == "/Tx":
                text_fields.append(field_name)
    
    mapped_fields = {text_field: "" for text_field in text_fields}
    return mapped_fields


def generate_mapping_template(pdf_path, output_json):
    fields = extract_text_fields(pdf_path)
    mapping_template = {field: "" for field in fields.keys()}  # Map each field to an empty string
    with open(output_json, "w") as f:
        json.dump(mapping_template, f, indent=4)

# Example Usage
immigration_document = "Form I-864 Affidavit of Support"
inputPath = f"dataScraping/easyDocuments/{immigration_document}.pdf"
outputPath = f"dataScraping/{immigration_document}TextMappings.json"
generate_mapping_template(inputPath, outputPath)
