from ignore.allFilesConfirmed import arr

arr1 = set(arr)


with open("removeDuplicates", 'w') as file:
    for link in arr1:
        file.write("'" + link + "'\n")