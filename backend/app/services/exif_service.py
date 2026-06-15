import exifread

def extract_exif(file_path):

    with open(file_path, "rb") as f:

        tags = exifread.process_file(f)

    result = {}

    for tag in tags:

        result[tag] = str(tags[tag])

    return result