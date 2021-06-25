movies = [{"Name":3,"Year":2012,"Director":"Aishwarya"},{"Name":"RajaRani","Year":2014,"Director":"Atlee"}]
def add():
    name = input("Enter movie name: ")
    year = input("Enter movie release year: ")
    director = input("Enter movie director name: ")
    movies.append({
        "Name" : name,
        "Year" : year,
        "Director" : director
    })


def show(movies):
    for movie in movies:
        print(f"Name : {movie['Name']}")
        print(f"Year : {movie['Year']}")
        print(f"Director : {movie['Director']}")
    

def find():
    find = input("Search by Name,Year,Director: ")
    find_by = input("Search by: ")
    found = []
    for movie in movies:
        if movie[find] == find_by:
            found.append(movie)
    show(found)
    
def operations():
    a = int(input("Enter 1 to add a movie, 2 to see your movies, 3 to find a movie, 4 to quit: "))
    while a != 4:
        if a == 1:
            add()
        elif a == 2:
            show(movies)
        elif a == 3:
            find()
        else:
            print("Invalid input")
        a = int(input("\n Enter 1 to add a movie, 2 to see your movies, 3 to find a movie, 4 to quit: "))

operations()
