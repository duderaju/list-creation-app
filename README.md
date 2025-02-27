List Creation App
Overview
A React-based application for dynamically fetching and managing lists. Users can select exactly two lists to create a new list, move items between lists, and update or cancel changes.

Features
Fetches lists from the List Creation API.
Displays a loader while fetching data.
Shows a failure view if the request fails, with a retry option.
Allows selecting exactly two lists to create a new list.
Supports moving items between selected lists.
Provides cancel and update options.
How It Works
Fetch Data – On page load, an HTTP GET request retrieves list data.
Create a New List – Select exactly two lists and click Create a new list to add an empty list between them.
Move Items – Use arrow buttons to move items between lists.
Update or Cancel – Click Update to save changes or Cancel to revert.
