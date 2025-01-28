from diagrams import Diagram, Cluster
from diagrams.programming.framework import Flask
from diagrams.onprem.client import Users
from diagrams.onprem.compute import Server
from diagrams.onprem.network import Internet
from diagrams.onprem.database import PostgreSQL

with Diagram("Instagram System", show=False, filename="instagram_system"):
    with Cluster("Hardware"):
        devices = Users("User Devices")
        servers = Server("Server Infrastructure")
        cdn = Internet("CDN")
    
    with Cluster("Software"):
        apps = Flask("Mobile/Web Apps")
        backend = Flask("Backend Systems")
    
    with Cluster("Data"):
        user_data = PostgreSQL("User Data")
        content = PostgreSQL("Content Data")
        metadata = PostgreSQL("Metadata")
    
    # Hardware Connections
    devices >> cdn >> servers
    servers >> backend
    
    # Software Connections
    apps >> backend >> content
    
    # Data Flow
    devices >> content
    devices >> user_data
    backend >> metadata
    
    # System Connections
    backend >> user_data
    content >> servers
