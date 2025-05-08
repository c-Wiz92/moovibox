from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.orm import declarative_base, sessionmaker
from flask import session, jsonify

engine = create_engine("postgresql+psycopg2://rohith:rohith2007@127.0.0.1:5432/moovibox")
Base = declarative_base()

class User(Base):
    __tablename__ = "Reg_users"
    username = Column(String, primary_key=True)
    password = Column(String)
    mail = Column(String, unique=True)

Base.metadata.create_all(engine)

def userRegister(data):
    Session = sessionmaker(bind=engine)
    response = {}
    with Session() as curr_session:
        user = curr_session.query(User).filter_by(username = data["username"]).first()
        if user:
            response = {"msg": "User already exists.", "code": "FAIL EXISTS"}
        else:
            newUser = User(username = data["username"], password = data["password"], mail = data["mailID"])
            curr_session.add(newUser)
            curr_session.commit()
            response = {"msg": "Created account successfully.", "code": "PASS"}
            session["username"] = data["username"]
        return response

def userLogin(data):
    Session = sessionmaker(bind=engine)
    with Session() as new_session:
        password = new_session.query(User).filter_by(username = data["username"], password = data["password"]).first()
        username = new_session.query(User).filter_by(username = data["username"]).first()
        if password:
            session["username"] = data["username"]
            return {"msg": f"Logged in as {data['username']}.", "code": "PASS"}
        elif username:
            return {"msg": "Invalid username or password.", "code": "FAIL"}
        else:
            return {"msg": "User does not exist.", "code": "FAIL"}

def getUserData():
    username = session.get("username")
    if not username:
        return {"msg":"No user logged in currently."}
    Session = sessionmaker(bind=engine)
    with Session() as user_session:
        info = user_session.query(User).filter_by(username=username).first()
        return {"username": info.username, "mail": info.mail}