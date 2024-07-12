![image](https://github.com/user-attachments/assets/47d6f68d-d137-48b9-b964-2e1e73c2ce5a)


# Rank Checker

This project is a simple web application built with Next.js and Tailwind CSS that allows users to check the ranking of a website for a specific keyword using the Google Custom Search JSON API.

## Features

- Check the ranking of a website for a given keyword.
- Displays the ranking in a user-friendly interface.
- Shows a loading spinner while fetching data from the API.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/oh007/seo_tools.git
    cd rank-checker
    ```

2. Install the dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root directory and add your Google Custom Search API key and Search Engine ID:

    ```sh
    NEXT_PUBLIC_API_KEY=your_api_key
    NEXT_PUBLIC_SEARCH_ENGINE_ID=your_search_engine_id
    ```

    Replace `your_api_key` with your actual API key and `your_search_engine_id` with your actual Search Engine ID.

### How to Obtain an API Key and Search Engine ID

1. **Get a Google Custom Search API Key:**
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing project.
    - Go to the **APIs & Services** > **Credentials**.
    - Click on **Create Credentials** and select **API Key**.
    - Copy the generated API key.

    For detailed instructions, refer to [Google's documentation](https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key).

2. **Get a Google Custom Search Engine ID:**
    - Go to the [Custom Search Engine](https://cse.google.com/cse/all) page.
    - Click on **Add** to create a new search engine.
    - Enter your site URL(s) in the **Sites to search** field.
    - Once created, go to the **Control Panel** of your search engine.
    - Copy the **Search engine ID**.

    For detailed instructions, refer to [Google's documentation](https://developers.google.com/custom-search/docs/tutorial/creatingcse).

### Running the Application

1. Start the development server:

    ```sh
    npm run dev
    # or
    yarn dev
    ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Enter the website URL you want to check (e.g., `https://www.example.com`).
2. Enter the keyword you want to check the ranking for.
3. Click on the **Check Ranking** button.
4. The ranking result will be displayed below the form.

## Styling

The application uses Tailwind CSS for styling. The global styles and custom loader animation are defined in the `styles/globals.css` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
