from pypdf import PdfReader
import json

"""
This is purely to extract the text fields from a pdf document
It doesn't get the correct key value pair to edit the pdf.. at least I don't think 
"""

def extract_fields(pdf_path):
    reader = PdfReader(pdf_path)
    fields = {}

    # Iterate through all pages and extract field names
    for page_number, page in enumerate(reader.pages, start=1):
        if "/Annots" in page:
            for annot in page["/Annots"]:
                annot_obj = annot.get_object()
                field_name = annot_obj.get("/T")
                if field_name:
                    fields[field_name] = f"Page {page_number}"

    return fields

def generate_mapping_template(pdf_path, output_json):
    fields = extract_fields(pdf_path)
    mapping_template = {field: "" for field in fields.keys()}  # Map each field to an empty string
    with open(output_json, "w") as f:
        json.dump(mapping_template, f, indent=4)

# Example Usage
inputPath = pdfPath = "dataScraping/easyDocuments/Form I-130A.pdf"
generate_mapping_template(inputPath, "dataScraping/Form I-130ATextMappings")
