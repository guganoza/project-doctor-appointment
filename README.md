# Doctor appointment

You are building a doctor appointment app that allows customers to secure a visit to the doctor at their desired time.
The app has two types of users:  
1. Hospital admins  
2. Customers - patients booking a visit to a doctor  

The application should work in all major web browsers (chrome, safari, firefox, edge).  

Initially, there is a single admin user. Admin can manage doctors using the "doctor management" page. This page displays the list of doctors. Admin can search doctors by category (exact match), name (partial match), last name (partial match), and personal number. 
Admin can add, remove and edit doctors. To add a doctor, the user should fill in the following fields:
1. Name  
2. Last name  
3. Email  
4. Phone  
5. Category (for example, pediatrics, pulmonology, etc. )  
6. Working days (dropdown with weekdays, multi-select)   
7. Description  

Admin can temporarily block doctor and later reactivate if required. Patients can not book a visit to blocked doctors.

Patients can register on the platform to book a visit to a doctor. During registration, the customer must fill in the following fields: name, last name, phone number, and email.
After registration, customers can use the doctor search page to book a visit. Users can search doctors by category, name, and last name. Each item in search results has a "view doctor" button. By clicking the "view" button, the user navigates to the doctor details page, where detailed information about the doctor is displayed, including name, last name, email, phone, and description. This page also has the "book visit" button. After clicking the "book" button, a popup opens. The popup contains the date field( calendar picker)  and the "confirm" button. The user should click the "confirm" button to complete the booking process.
Customers can view their current and past bookings using the "my bookings" page. The user can search bookings by date (range).
By clicking on an item in the search result list, the user navigates to the booking details page. The booking details page displays the following info: visit date, category, and doctor contact info(name, last name, email, and phone).

General notes:  
The landing page contains registration and sign-in page links for users.  
The application should contain a header, footer, and navigation menu.  
The website header should display a name with greeting text and a signout button for an authenticated user.  
After signing in, the user is navigated to the home page, which has a dashboard with useful links and information.  
All lists containing potentially  more than ten items should use paging.  
All forms, except popups, should be linkable (bookmarkable).  
All descriptions may include formatted text and require a WYSIWYG editor.  
