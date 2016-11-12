from data.tables import *

DBSession = sessionmaker(bind=engine)
session = DBSession(autocommit=True)

session.begin()


def put(data):
    release = session.query(Release).filter(release_id=data['release_id']).first()
    release.release_name = data['release_name']
    release.release_hours = data['release_hours']
    release.instructor_id = data['instructor_id']
    # ...and so on


def post(data):
    inserted_release = Release(
        release_name=data['release_name'],
        release_hours=data['release_hours'],
        instructor_id=data['instructor_id']
    )
    session.add(inserted_release)


def get(data):
    x = session.query(Release).filter(release_id=data['release_id']).first()
    if x:
        return x.to_data()
    else:
        return {"error": 'Hey, man, that\'s a bad burrito'}


def delete(data):
    to_delete = session.query(Release).filter(release_id=data['release_id']).first()
    if to_delete:
        session.delete(to_delete)
    else:
        return {"error": 'Cannot delete; release does not exist.'}
