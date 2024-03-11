from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base

class Member(Base):
  __tablename__ = "member"
  member_id = Column(Integer, primary_key = True, index = True, name="member_id")
  email = Column(String(255), name="email")
  gender = Column(String(255), name="gender")
  age = Column(String(255), name="age")
  sign_data = Column(DateTime, name="sign_data")
  status = Column(Boolean, name="status")

class Article(Base):
  __tablename__ = "article"
  article_id = Column(Integer, primary_key = True, index = True)
  title = Column(String(255))
  content = Column(String(255))
  writed_date = Column(DateTime, default = func.now())
  url = Column(String(255))
  category = Column(String(255))
  img = Column(String(255))
  keyword = Column(String(255))

class Recode(Base):
  __tablename__ = "recode"
  recode_id = Column(Integer, primary_key = True, index = True)
  member_id = Column(Integer, ForeignKey("member.member_id"))
  article_id = Column(Integer, ForeignKey("article.article_id"))
  like = Column(Boolean)

class Keyword(Base):
  __tablename__ = "keyword"
  keyword_id = Column(Integer, primary_key = True, index = True)
  member_id = Column(Integer, ForeignKey("member.member_id"))
  word = Column(String(255))

class Recommend(Base):
  __tablename__ = "recommend"
  recommend_id = Column(Integer, primary_key = True, index = True)
  member_id = Column(Integer, ForeignKey("member.member_id"))
  article_id = Column(Integer, ForeignKey("article.article_id"))
  score = Column(Integer)