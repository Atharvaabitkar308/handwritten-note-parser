import pytesseract
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

async def parse_image(file_path):
    image = Image.open(file_path).convert("RGB")
    text = pytesseract.image_to_string(image)
    return text