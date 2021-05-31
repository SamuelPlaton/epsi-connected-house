import csv

# app function
def app():
    file = open('fill_data.csv', 'w', newline='')
    writer = csv.writer(file)
    writer.writerow(["Values", 'Hours', 'Months'])
    months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    for month in months:
        hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        for hour in hours:
            temp = 0
            if month in [12, 1, 2]:
                if hour in [0, 1, 2, 3, 4, 5, 6]:
                    temp = 0
                elif hour in [7, 8, 9, 10, 11, 12]:
                    temp = 4
                elif hour in [13, 14, 15, 16, 17]:
                    temp = 8
                elif hour in [18, 19]:
                    temp = 6
                elif hour in [20, 21, 22, 23]:
                    temp = 4
            elif month in [3, 4, 5]:
                if hour in [0, 1, 2, 3, 4, 5, 6]:
                    temp = 10
                elif hour in [7, 8, 9, 10, 11, 12]:
                    temp = 20
                elif hour in [13, 14, 15, 16, 17]:
                    temp = 25
                elif hour in [18, 19]:
                    temp = 20
                elif hour in [20, 21, 22, 23]:
                    temp = 15
            elif month in [6, 7, 8]:
                if hour in [0, 1, 2, 3, 4, 5, 6]:
                    temp = 35
                elif hour in [7, 8, 9, 10, 11, 12]:
                    temp = 45
                elif hour in [13, 14, 15, 16, 17]:
                    temp = 55
                elif hour in [18, 19]:
                    temp = 50
                elif hour in [20, 21, 22, 23]:
                    temp = 40
            elif month in [9, 10, 11]:
                if hour in [0, 1, 2, 3, 4, 5, 6]:
                    temp = 5
                elif hour in [7, 8, 9, 10, 11, 12]:
                    temp = 15
                elif hour in [13, 14, 15, 16, 17]:
                    temp = 25
                elif hour in [18, 19]:
                    temp = 20
                elif hour in [20, 21, 22, 23]:
                    temp = 10
            print(temp, hour, month)
            writer.writerow([temp, hour, month])



# Main function
if __name__ == '__main__':
    app()