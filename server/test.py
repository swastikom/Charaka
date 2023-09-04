my_array = [1]  # An empty array

if not my_array:
    print("No item")
else:
    latest_index = None  # Initialize latest_index to None

    # Using a for loop and enumerate to traverse the array
    for index, value in enumerate(my_array):
        latest_index = index  # Update the latest index on each iteration

    # Print the latest index after the loop or "No item" if the array is empty
    if latest_index is not None:
        print("Latest index:", latest_index)
    else:
        print("No item")
