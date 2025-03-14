# Specify the relative path to the existing file
file_path = 'fieldMappings/combined_mappings.json'  # Adjust this path based on your file's location

# Open the file and print each line
with open(file_path, 'r') as file:
    for line in file:
        print(line.strip())  # Use .strip() to remove extra whitespace or newlines
