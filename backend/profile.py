from flask import session, jsonify
from sqlalchemy import create_engine, Column, String, Integer, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker

from userauth import User

engine = create_engine("postgresql+psycopg2://rohith:rohith2007@127.0.0.1:5432/moovibox")
Base = declarative_base()
metadata = MetaData()
recentTable = Table("recent", metadata, autoload_with=engine)
favTable = Table("favourite", metadata, autoload_with=engine)

class RecentTable(Base):
    __table__ = recentTable
class FavouriteTable(Base):
    __table__ = favTable

Session = sessionmaker(bind=engine)
def profileInfo():
    with Session() as new_session:
        recResults = new_session.query(RecentTable).filter_by(username=session["username"]).all()
        favResults = new_session.query(FavouriteTable).filter_by(username=session["username"], favourite = True).all()
        favourite_results = [{"id" : i.id} for i in favResults]
        recent_results = [{"username": i.username, "id": i.recent, "url": i.url} for i in recResults]
        return {"recent_results": recent_results, "favourite_results": favourite_results}