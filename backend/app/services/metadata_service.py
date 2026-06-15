import os
import mimetypes

def extract_metadata(file_path):

    return {
        "file_name": os.path.basename(file_path),
        "file_size": os.path.getsize(file_path),
        "mime_type": mimetypes.guess_type(file_path)[0]
    }