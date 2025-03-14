from pypdf import PdfReader, PdfWriter
from pypdf.generic import BooleanObject, NameObject, IndirectObject

# This was also to play aroundn and mess with data extraction and editing. 

def set_need_appearances_writer(writer):
    """
    Set the /NeedAppearances flag to True in the PDF's /AcroForm dictionary.
    This forces the PDF viewer to regenerate appearance streams for form fields.
    """
    catalog = writer._root_object
    if "/AcroForm" not in catalog:
        catalog[NameObject("/AcroForm")] = writer._add_object({})
    acro_form = catalog["/AcroForm"]
    acro_form[NameObject("/NeedAppearances")] = BooleanObject(True)

def extract_and_modify_text_fields(pdf_path, output_pdf_path):
    """
    Extract all text fields from a PDF and modify them by appending 'a'.
    
    Args:
        pdf_path (str): Path to the input PDF file.
        output_pdf_path (str): Path to save the modified PDF file.
        
    Returns:
        list: A list of all extracted text field names.
    """
    # Read the PDF
    reader = PdfReader(pdf_path)
    writer = PdfWriter()

    # Clone the AcroForm structure to ensure form fields are preserved
    writer.clone_reader_document_root(reader)

    # Set NeedAppearances flag
    set_need_appearances_writer(writer)

    # List to store extracted field names
    text_fields = []

    # Get all form fields from the PDF
    fields = reader.get_fields()

    if fields:
        for field_name, field_attributes in fields.items():
            if field_attributes.get("/FT") == "/Tx":
                text_fields.append(field_name)
    
    
    mapped_fields = {text_field: "A" for text_field in text_fields}
    for page in writer.pages:
        writer.update_page_form_field_values(page, mapped_fields)

    # Save the modified PDF
    with open(output_pdf_path, "wb") as output_file:
        writer.write(output_file)

    return text_fields

# Example Usage
input_pdf = "dataScraping/easyDocuments/Form I-130A.pdf"  # Path to your input PDF
output_pdf = "dataScraping/modified_example.pdf"  # Path to save the modified PDF
# Extract and modify text fields
fields = extract_and_modify_text_fields(input_pdf, output_pdf)

# Print extracted fields
print("Extracted Text Fields:")
for field in fields:
    print(field)
