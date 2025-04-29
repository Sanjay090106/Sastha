// Function to load HTML components
async function loadComponent(id, file) {
  try {
    const response = await fetch(`components/${file}`);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// Load all components and initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Load all components
  loadComponent("navbar", "navbar.html");
  loadComponent("hero", "hero.html");
  loadComponent("featuredservices", "featuredservices.html"); 
  loadComponent("works", "services.html"); 
  loadComponent("about", "about.html");
  loadComponent("clients", "clients.html");
  loadComponent("fabrication", "fabrication.html");
  loadComponent("testimonials", "testimonials.html");
  loadComponent("enquiry", "enquiry.html");
  loadComponent("call", "call.html");
  loadComponent("footer", "footer.html");

  // Initialize event listeners after components are loaded
  setTimeout(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector(".md\\:hidden button");
    const mobileMenu = document.querySelector(".hidden.md\\:hidden.fixed");
    const closeMenuButton = mobileMenu?.querySelector("button");

    if (mobileMenuButton && mobileMenu && closeMenuButton) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.remove("hidden");
      });

      closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });

      // Close mobile menu when clicking on a link
      mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
        });
      });
    }

    // Service tabs functionality
    const serviceTabs = document.querySelectorAll(".mb-8 button");
    serviceTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Reset all tabs
        serviceTabs.forEach((t) => {
          t.classList.remove("bg-primary", "text-white");
          t.classList.add("bg-gray-200", "text-gray-700");
        });

        // Activate clicked tab
        tab.classList.remove("bg-gray-200", "text-gray-700");
        tab.classList.add("bg-primary", "text-white");
      });
    });

    // Portfolio filter functionality for Our Works section
    const worksSection = document.getElementById("works");
    if (worksSection) {
      const viewAllBtn = document.getElementById("view-all-btn");
      const moreProjects = document.getElementById("more-projects");
      const portfolioGrid = document.getElementById("portfolio-grid");
      const structuralProjects = document.getElementById("structural-projects");
      const decorativeProjects = document.getElementById("decorative-projects");
      const industrialProjects = document.getElementById("industrial-projects");
      const finishingProjects = document.getElementById("finishing-projects");
      const processesProjects = document.getElementById("processes-projects");
      const specializedProjects = document.getElementById("specialized-projects");
      const emptyState = document.getElementById("empty-state");
      const filterButtons = document.querySelectorAll(".filter-btn");

      // Show "View All" button by default (for "All Projects")
      if (viewAllBtn) viewAllBtn.classList.remove("hidden");

      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Update button styles
          filterButtons.forEach((btn) => {
            btn.classList.remove("bg-primary", "text-white");
            btn.classList.add("bg-gray-200", "text-gray-700");
          });
          this.classList.remove("bg-gray-200", "text-gray-700");
          this.classList.add("bg-primary", "text-white");

          const filter = this.getAttribute("data-filter");

          // Hide all sections by default
          portfolioGrid.classList.add("hidden");
          structuralProjects.classList.add("hidden");
          decorativeProjects.classList.add("hidden");
          industrialProjects.classList.add("hidden");
          finishingProjects.classList.add("hidden");
          processesProjects.classList.add("hidden");
          specializedProjects.classList.add("hidden");
          emptyState.classList.add("hidden");
          moreProjects.classList.add("hidden");
          viewAllBtn.classList.add("hidden");

          // Show relevant section based on filter
          if (filter === "all") {
            portfolioGrid.classList.remove("hidden");
            viewAllBtn.classList.remove("hidden"); // Show View All button
          } else if (filter === "structural") {
            structuralProjects.classList.remove("hidden");
          } else if (filter === "decorative") {
            decorativeProjects.classList.remove("hidden");
          } else if (filter === "industrial") {
            industrialProjects.classList.remove("hidden");
          } else if (filter === "finishing") {
            finishingProjects.classList.remove("hidden");
          } else if (filter === "processes") {
            processesProjects.classList.remove("hidden");
          } else if (filter === "specialized") {
            specializedProjects.classList.remove("hidden");
          } else {
            emptyState.classList.remove("hidden"); // Fallback for invalid filters
          }
        });
      });

      // View All button functionality (for All Projects)
      if (viewAllBtn) {
        viewAllBtn.addEventListener("click", function () {
          if (moreProjects) {
            moreProjects.classList.remove("hidden");
          }
          this.classList.add("hidden");
        });
      }
    }
  }, 100); // Small delay to ensure components are loaded
});