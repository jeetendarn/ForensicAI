from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def analyze_evidence(metadata):

    file_type = metadata.get(
        "mime_type",
        ""
    )

    if "image" in file_type:

        return """
Evidence Type: Image

Risk Level: Medium

Findings:
Image evidence detected.

Recommendations:
Preserve original evidence.
Verify metadata.
Maintain chain of custody.
"""

    elif "pdf" in file_type:

        return """
Evidence Type: Document

Risk Level: Low

Findings:
Document evidence detected.

Recommendations:
Review contents.
Verify source.
"""

    else:

        return """
Evidence Type: Unknown

Risk Level: Low

Findings:
Unable to classify evidence.

Recommendations:
Manual review required.
"""