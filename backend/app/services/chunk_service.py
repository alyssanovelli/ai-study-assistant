def chunk_text(text, chunk_size=1000, overlap=200):
    """
    Splits the input text into chunks of specified size.

    Args:
        text (str): The input text to be chunked.
        chunk_size (int): The maximum size of each chunk.
        overlap (int): The number of characters to overlap between chunks.

    Returns:
        list: A list of text chunks.
    """
    chunks = []

    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        if chunk.strip():  # Only add non-empty chunks
            chunks.append(chunk)

        start += chunk_size - overlap  # Move the start index forward with overlap
    return chunks