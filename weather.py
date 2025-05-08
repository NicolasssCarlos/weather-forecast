from config import api_key
import requests

while True:
    city = input("Type a location: ")
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=en-us"
    result = requests.get(url)

    print(result.status_code)

    if result.status_code == 200:
        print("1. For Fahrenheit")
        print("2. For Celsius")
        option = int(input("Choose temperature unit: "))

        dados = result.json()
        name_city = dados["name"]
        temperature = dados["main"]["temp"]
        description = dados["weather"][0]["description"]
        humidity = dados["main"]["humidity"]
        feels = dados["main"]["feels_like"]
        country = dados["sys"]["country"]

        if option == 1:
            temperature_fahrenheit = temperature * 9/5 + 32
            print(f"Weather forecast for {name_city}, {country}:")
            print(f"Temperature: {temperature_fahrenheit: .2f}°F")
            print(f"Weather description: {description}")
            print(f"Humidity: {humidity}%")
            print(f"Feels like: {feels}")

        elif option == 2:
            print(f"Weather forecast for {name_city}, {country}:")
            print(f"Temperature: {temperature}°C")
            print(f"Weather description: {description}")
            print(f"Humidity: {humidity}%")
            print(f"Feels like: {feels}")

        else:
            print("Invalid option. Please choose either 1 or 2.")

        print("Would you like to use it more?")
        print('Type "yes" to see more places around the world')
        print("Or")
        print('Type "no" to exit the application')

        continuos = input("Do you want to check another city?: ").lower()
        if continuos != "yes":
            print("Thanks for checking the weather with us.")
            break

    else:
        print("An error occurred while making the API request")
        break


    