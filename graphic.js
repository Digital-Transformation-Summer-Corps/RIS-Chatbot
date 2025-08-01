// Mermaid diagram definition
const chatbotDiagram = `
graph TB
    %% Define styles
    classDef dataSource fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef processing fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef storage fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    classDef interface fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef model fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef validation fill:#e0f2f1,stroke:#004d40,stroke-width:2px

    %% Nodes
    Confluence[("Confluence Documentation")]:::dataSource
    DataCollector["Data Collector - Scraper"]:::processing
    EmbeddingModel["Embedding Model - Text to Vectors"]:::model
    VectorDB[(Vector Database - Embedded Docs)]:::storage
    WebServer["Web Server - Query Interface"]:::interface
    LLM["Large Language Model - Response Generator"]:::model
    Validator["Validator - Quality Assurance"]:::validation
    ReasoningModel["Reasoning Model - Question Generator"]:::model
    User((User)):::interface

    %% Main pipeline flow
    Confluence -->|Raw docs| DataCollector
    DataCollector -->|Scraped text| EmbeddingModel
    EmbeddingModel -->|Vector embeddings| VectorDB
    
    User -->|Query| WebServer
    WebServer -->|Query vector| VectorDB
    VectorDB -->|Top 5 docs via cosine similarity| WebServer
    WebServer -->|Query plus Context| LLM
    LLM -->|Response| WebServer
    WebServer -->|Response| User

    %% Validation flow
    ReasoningModel -->|Test questions| Validator
    Validator -->|Test queries| WebServer
    WebServer -.->|Responses| Validator
    Validator -.->|Accuracy feedback| LLM
`;

// Validation flow
const validationDefinition = `

`

// Function to render the diagram
function renderDiagram(containerId = 'mermaid-diagram') {
    // Check if Mermaid is loaded
    if (typeof mermaid === 'undefined') {
        console.error('Mermaid library is not loaded. Please include mermaid.js');
        return;
    }
    
    // Initialize Mermaid with configuration
    mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        flowchart: {
            htmlLabels: true,
            curve: 'linear'
        },
        securityLevel: 'loose'
    });
    
    // Get the container element
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    // Generate a unique ID for the diagram
    const diagramId = 'diagram-' + Math.random().toString(36).substr(2, 9);
    
    // Render the diagram
    mermaid.render(diagramId, chatbotDiagram)
        .then(({svg}) => {
            container.innerHTML = svg;
        })
        .catch(error => {
            console.error('Error rendering diagram:', error);
            container.innerHTML = '<p>Error rendering diagram</p>';
        });
}

// Function to create a complete HTML page with the diagram
function createDiagramHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAG Chatbot Architecture</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        #mermaid-diagram {
            text-align: center;
            margin: 20px 0;
        }
        .description {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-left: 4px solid #007bff;
            font-size: 14px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>RAG Chatbot Architecture Diagram</h1>
        <div id="mermaid-diagram"></div>
        <div class="description">
            <h3>Architecture Overview:</h3>
            <p>This diagram shows the architecture of a Retrieval-Augmented Generation (RAG) chatbot system that processes documentation from Confluence and provides intelligent responses to user queries.</p>
            <ul>
                <li><strong>Data Sources:</strong> Confluence documentation</li>
                <li><strong>Processing:</strong> Data scraping and text embedding</li>
                <li><strong>Storage:</strong> Vector database for semantic search</li>
                <li><strong>Interface:</strong> Web server for user interaction</li>
                <li><strong>AI Models:</strong> Embedding, LLM, and reasoning models</li>
                <li><strong>Validation:</strong> Quality assurance and testing</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Initialize and render the diagram when page loads
        document.addEventListener('DOMContentLoaded', function() {
            ${renderDiagram.toString()}
            renderDiagram();
        });
    </script>
</body>
</html>
    `;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        chatbotDiagram,
        renderDiagram,
        createDiagramHTML
    };
}

// Auto-render if running in browser and DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderDiagram());
    } else {
        renderDiagram();
    }
}