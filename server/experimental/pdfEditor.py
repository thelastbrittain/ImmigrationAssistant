from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, DictionaryObject

def getFileFields(pdf_path):
    reader = PdfReader(pdf_path)
    # Get all form text fields
    fields = reader.get_form_text_fields()
    return fields

def set_acroform(writer):
    # Add an AcroForm dictionary if it doesn't exist
    catalog = writer._root_object
    if "/AcroForm" not in catalog:
        catalog[NameObject("/AcroForm")] = writer._add_object(DictionaryObject())

def editFieldNames(fromPath, toPath):
    reader = PdfReader(fromPath)
    writer = PdfWriter()

    # Clone the reader's document root into the writer
    writer.clone_reader_document_root(reader)

    # Update form field values (applies to all pages)
    field_values = {
        "form1[0].#subform[0].LastName[0]": "Doe",
        "form1[0].#subform[0].FirstName[0]": "John",
        "form1[0].#subform[0].MiddleName[0]": "Middle",
        "form1[0].#subform[0].Email[0]": "jdoe@byu.edu",
        "form1[0].#subform[0].MobilePhoneNumber[0]": "123-456-7891"
    }

    # Use update_page_form_field_values for each page
    for page in writer.pages:
        writer.update_page_form_field_values(page, field_values)

    # Save the updated PDF
    with open(toPath, "wb") as output_file:
        writer.write(output_file)

    print(f"Updated PDF saved to: {toPath}")

def main():
    pdfPath = "server/easyDocuments/g-1145-new.pdf"
    # outputPath = "./outputDocuments/trial1.pdf"
    
    # Get and display all field names
    fields = getFileFields(pdfPath)
    print("Fillable field names:")
    for name in fields.keys():
        print(name)
    
    # Edit and save the PDF with updated field values
    # editFieldNames(pdfPath, outputPath)

main()
