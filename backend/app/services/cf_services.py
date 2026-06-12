import requests

BASE_URL = "https://codeforces.com/api"

def get_user_info(handle: str):
    
    """
    Fetch basic profile information of a Codeforces user.
    """
    url= f"{BASE_URL}/user.info?handles={handle}"
    response=requests.get(url)

    if response.status_code!=200:
        return {"error": "Failed to fetch data from Codeforces"}
    
    data=response.json()
    if data.get("status") !="OK":
        return {"error": "Invalid Codeforces handle"}
    
    return data["result"][0]


def get_rating_history(handle:str):
    """
    Fetiching users rating
    """ 
    url=f"{BASE_URL}/user.rating?handle={handle}"
    response=requests.get(url)

    if response.status_code!=200:
        return {"error":"Failed to fetch the users rating"}
    
    data=response.json()
    if data.get("status")!="OK":
        return {"error":"Invalid Codeforces Handle"}
    
    return data["result"]


def get_submissions(handle: str):

    url = f"{BASE_URL}/user.status?handle={handle}"

    response = requests.get(url)

    if response.status_code != 200:
        return {"error": "Failed to fetch submissions"}

    data = response.json()

    if data.get("status") != "OK":
        return {"error": "Invalid Codeforces handle"}

    return data["result"]