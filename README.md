
# Real Estate Application

This is a simple **Real Estate Application** built with **Next.js** and **Material-UI** for managing and viewing property listings. The application provides users (customers and admins) with the ability to search and filter properties, view detailed property information, and toggle between customer and admin views.

### Features

1. **Search and Filter Properties**
   - Customers can search and filter properties based on location, type, and price range.
   - Results are displayed in a card format with property details like price, rooms, bathrooms, and a thumbnail image.

2. **Property Details View**
   - A detailed page displays more information about a property, including location, city, state, property type, number of rooms, number of bathrooms, and price.
   - Users can view photos of the property.

3. **View Toggle (Customer / Admin)**
   - A toggle switch allows users to switch between **Customer View** and **Admin View**.
   - The customer view shows property listings, while the admin view (currently without CRUD functionality) would allow managing listings.

4. **Charts for Property Statistics**
   - The app displays charts using **ApexCharts** to show statistics such as:
     - Median Property Price by Location.
     - Number of Properties in Each Location.
   - These charts provide insights into the market trends and the number of available properties in different locations.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/real-estate-app.git
cd real-estate-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open the application in your browser at `http://localhost:3000`.

### Technologies Used

- **Next.js**: A React framework for building the web application.
- **Material-UI**: A popular React UI framework for building the user interface.
- **ApexCharts**: A charting library to display property statistics (median prices, number of properties, etc.).
- **TailwindCSS**: A utility-first CSS framework used for styling and layout.
- **React**: JavaScript library for building user interfaces.
- **React State**: For managing the application's state, including property data and user selections.
- **LocalStorage**: Used to persist data (properties) across page refreshes.

### Folder Structure

```
/pages
  /index.tsx         - Home page, shows property listings and search/filter functionality.
  /property/[id].tsx - Property details page for each individual property.
  /admin.tsx          - Admin page for managing properties (currently with viewing functionality only).
/components
  /PropertyCard.tsx   - Displays each property in a card format.
  /SearchFilters.tsx  - Handles the search and filter functionality.
  /Charts.tsx         - Renders the charts for property statistics.
/styles
  /globals.css        - Global styles.
  /tailwind.css       - TailwindCSS configuration and custom styles.
```

### Future Enhancements

- **Admin CRUD Functionality**: Implement the ability for admins to create, edit, delete, and manage property listings.
- **Property Photo Upload**: Allow admins to upload property photos directly.
- **User Authentication**: Implement login functionality for admins to restrict access to certain features.
- **Database Integration**: Replace `localStorage` with a real backend database to store property data persistently.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
