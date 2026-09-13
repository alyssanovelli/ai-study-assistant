from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from pgvector.sqlalchemy import Vector


# Base class for all database models
class Base(DeclarativeBase):
    pass


# Represents an uploaded document
class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    filename: Mapped[str] = mapped_column(String(255))
    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )


# Represents a chunk of text from a document
class Chunk(Base):
    __tablename__ = "chunks"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)

    # Links this chunk to its document
    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id")
    )

    # Position of this chunk within the document
    chunk_index: Mapped[int] = mapped_column(Integer)

    # The actual text of the chunk
    content: Mapped[str] = mapped_column(Text)

    # Vector representation used for semantic search
    embedding: Mapped[list[float]] = mapped_column(
        Vector(1536),
        nullable=True
    )