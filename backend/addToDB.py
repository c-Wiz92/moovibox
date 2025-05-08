# Table Name: 'recent' 
# Columns: (1) 'username' - TEXT (2) 'recent' - INTEGER(for movie id) (3) 'url' -TEXT

from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker
from flask import session

engine = create_engine("postgresql+psycopg2://rohith:rohith2007@127.0.0.1:5432/moovibox")
Session = sessionmaker(bind=engine)
metadata = MetaData()
Base = declarative_base()
recent_table = Table("recent", metadata, autoload_with=engine)

class Recent(Base):
    __table__ = recent_table

def addToRecent(id, url):
    with Session() as add_recent_session:
        already_exists = add_recent_session.query(Recent).filter_by(username=session["username"], recent=id).first()
        if already_exists:
            return {"msg": "recently viewed movie is already in the database"}
        else:
            newEntry = Recent(username=session["username"], recent=id, url=url)
            add_recent_session.add(newEntry)
            add_recent_session.commit()
