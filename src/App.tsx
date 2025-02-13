import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { HomePage } from "./pages/HomePage"
import { WebsiteDevelopmentPage } from "./pages/services/WebsiteDevelopment"
import { AppDevelopmentPage } from "./pages/services/AppDevelopment"
import { GameDevelopmentPage } from "./pages/services/GameDevelopment"
import { DigitalMarketingPage } from "./pages/services/DigitalMarketing"
import { VideoEditingPage } from "./pages/services/VideoEditing"
import { AmazonServicesPage } from "./pages/services/AmazonServices"
import { SearchEnginePlatformPage } from "./pages/services/SearchEnginePlatform"
import { BrandingCreativePage } from "./pages/services/BrandingCreative"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "services/website-development",
        element: <WebsiteDevelopmentPage />
      },
      {
        path: "services/app-development",
        element: <AppDevelopmentPage />
      },
      {
        path: "services/game-development",
        element: <GameDevelopmentPage />
      },
      {
        path: "services/digital-marketing",
        element: <DigitalMarketingPage />
      },
      {
        path: "services/video-editing",
        element: <VideoEditingPage />
      },
      {
        path: "services/amazon-services",
        element: <AmazonServicesPage />
      },
      {
        path: "services/search-engine-platform",
        element: <SearchEnginePlatformPage />
      },
      {
        path: "services/branding-creative",
        element: <BrandingCreativePage />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
