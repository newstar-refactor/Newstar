from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base, engine


class Member(Base):
  __tablename__ = "member"
  member_id = Column(Integer, primary_key=True, index=True)
  sign_date = Column(DateTime)
  pw = Column(String(255))


class Article(Base):
  __tablename__ = "article"
  article_id = Column(Integer, primary_key=True, index=True)
  title = Column(String(255))
  url = Column(String(255))
  date = Column(DateTime, default=func.now())
  Bcategory = Column(Integer)
  Scategory = Column(Integer)
  image_url = Column(String(255))
  content = Column(String(10000))

class Recode(Base):
  __tablename__ = "recode"
  recode_id = Column(Integer, primary_key=True, index=True)
  member_id = Column(Integer, ForeignKey("member.member_id"))
  article_id = Column(Integer, ForeignKey("article.article_id"))
  likes = Column(Boolean)


class Keyword(Base):
  __tablename__ = "keyword"
  keyword_id = Column(Integer, primary_key=True, index=True)
  article_id = Column(Integer, ForeignKey("article.article_id"))
  word = Column(String(255))


class Category(Base):
  __tablename__ = "category"
  keyword_id = Column(Integer, primary_key=True, index=True)
  member_id = Column(Integer, ForeignKey("member.member_id"))
  number = Column(Integer)

# class LastArticleId(Base):
#   __tablename__ = "last_article_id"
#   article_id = Column(Integer)


def init_db():
  Base.metadata.create_all(bind=engine)
