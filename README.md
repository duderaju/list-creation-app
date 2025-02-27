List Creation App
Overview
The List Creation App is a React-based application that allows users to fetch and manage lists dynamically. Users can select exactly two lists to create a new list, move list items between selected lists, and update or cancel changes.

Features
Fetches list data from the List Creation API using an HTTP GET request.
Displays a loader while fetching data.
Shows a failure view if the API request fails, with a retry option.
Allows selecting exactly two lists for creating a new list.
Provides a List Creation View where users can move items between lists.
Supports canceling changes to revert to the original state.
Updates lists when the Update button is clicked.
How It Works
1. Initial Data Fetching
When the page loads, an HTTP GET request is sent to the List Creation API URL.
If successful, the lists are displayed in their respective containers based on the list_number.
If the request fails, a failure view is displayed with a Try Again button to retry the request.
2. Creating a New List
Users must select exactly two lists to create a new list.
If more or fewer than two lists are selected, an error message is displayed.
Upon selecting exactly two lists and clicking the Create a new list button:
A new empty list container appears between the selected lists.
Items can be moved between these lists using arrow buttons.
3. Moving List Items
Clicking the right arrow in the first list moves the item to the new list.
Clicking the left arrow in the second list moves the item to the new list.
Clicking the right arrow in the new list moves the item to the second list.
Clicking the left arrow in the new list moves the item to the first list.
4. Updating or Canceling Changes
Clicking Cancel reverts all changes and returns to the All Lists view.
Clicking Update saves the changes and updates the All Lists view.
