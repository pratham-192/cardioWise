import re
import string
import unicodedata

def encoding(text: str) -> str:
    text= unicodedata.normalize("NFKD",text)
    """
        Remove unicoded data
    """
    return text

def remove_URL(text: str) -> str:
    """
        Remove URLs 
    """
    return re.sub(r"https?://\S+|www\.\S+", "", text)

def remove_non_ascii(text: str) -> str:
    """
        Remove non-ASCII characters 
    """
    return re.sub(r'[^\x00-\x7f]',r'', text)

def remove_html(text: str) -> str:
    """
        Remove the html 
    """
    html = re.compile(r"<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});")
    return re.sub(html, "", text)

def remove_punct(text: str) -> str:
    """
        Remove the punctuation
    """
    return text.translate(str.maketrans('', '', string.punctuation))

def clean_text(text: str) -> str:
    text = encoding(text)
    text = text.lower()
    text = remove_URL(text)
    text = remove_non_ascii(text)
    text = remove_html(text)
    text = remove_punct(text)

    return text