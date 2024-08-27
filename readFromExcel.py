import openpyxl

allFiles = [

]

def populateArr():
    df = openpyxl.load_workbook("FileReport.xlsx")
    df1 = df.active
    for row in range(1, df1.max_row):
        print(row)
        allFiles.append('"' + str(df1[row][1].value) + '"')
 
    with open("allFiles", "w") as file:
        for item in allFiles:
            file.write(str(item) + ",\n")

populateArr()