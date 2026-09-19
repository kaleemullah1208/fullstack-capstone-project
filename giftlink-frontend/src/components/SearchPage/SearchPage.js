import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {
    // Task 1: Define state variables for search criteria and results
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);
    const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditions = ['New', 'Like New', 'Older'];

    const navigate = useNavigate();

    useEffect(() => {
        // fetch all products on initial load
        const fetchProducts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchProducts();
    }, []);

    // Task 2: Fetch search results based on user inputs
    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const categoryVal = document.getElementById('categorySelect').value;
        const conditionVal = document.getElementById('conditionSelect').value;

        const params = new URLSearchParams();
        if (searchQuery) params.append('name', searchQuery);
        if (ageRange) params.append('age_years', ageRange);
        if (categoryVal) params.append('category', categoryVal);
        if (conditionVal) params.append('condition', conditionVal);

        try {
            const response = await fetch(`${baseUrl}${params.toString()}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    // Task 6: Navigate to the details page of a selected gift
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center fw-bold">Search Gifts</h2>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="filter-section mb-4 p-4 border rounded shadow-sm bg-white">
                        <h5 className="fw-bold mb-3 text-secondary">Filters</h5>
                        <div className="row">
                            {/* Task 3: Category Dropdown */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="categorySelect" className="form-label fw-semibold">Category</label>
                                <select id="categorySelect" className="form-select">
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Task 3: Condition Dropdown */}
                            <div className="col-md-6 mb-3">
                                <label htmlFor="conditionSelect" className="form-label fw-semibold">Condition</label>
                                <select id="conditionSelect" className="form-select">
                                    <option value="">All Conditions</option>
                                    {conditions.map((condition) => (
                                        <option key={condition} value={condition}>{condition}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Task 4: Age Range Slider */}
                        <div className="mb-3">
                            <label htmlFor="ageRange" className="form-label fw-semibold">
                                Maximum Age: Less than {ageRange} year(s)
                            </label>
                            <input
                                type="range"
                                className="form-range"
                                id="ageRange"
                                min="1"
                                max="10"
                                value={ageRange}
                                onChange={(e) => setAgeRange(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Task 7: Search Input & Task 8: Search Button */}
                    <div className="search-bar d-flex mb-4">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search gifts by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn btn-primary px-4" onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                    {/* Task 5: Display search results */}
                    <div className="search-results">
                        {searchResults.length > 0 ? (
                            <div className="row">
                                {searchResults.map((product) => (
                                    <div key={product.id} className="col-md-6 mb-3">
                                        <div className="card h-100 search-card shadow-sm">
                                            {product.image && (
                                                <img src={product.image} alt={product.name} className="card-img-top search-card-img" />
                                            )}
                                            <div className="card-body">
                                                <h5 className="card-title fw-bold text-primary">{product.name}</h5>
                                                <div className="mb-2">
                                                    <span className="badge bg-secondary me-2">{product.category}</span>
                                                    <span className="badge bg-light text-dark border">{product.condition}</span>
                                                </div>
                                                <p className="card-text text-muted small">{product.description?.slice(0, 90)}...</p>
                                            </div>
                                            <div className="card-footer bg-white border-0">
                                                <button onClick={() => goToDetailsPage(product.id)} className="btn btn-outline-primary btn-sm w-100">
                                                    View Details &rarr;
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="alert alert-info text-center" role="alert">
                                No products found. Please revise your search filters.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
