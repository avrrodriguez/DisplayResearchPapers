const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((element) => {
      // add click event listener to a links in menu, prevent browser from going to link automatically
      element.addEventListener("click", (event) => {
        event.preventDefault();

        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    // Event handler for url changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });

    // Go to correct url when entering from an outside page link
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    // console.log("Going to", route);

    // changes url based on link route1
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    // sets page content based on route using custom elements
    let pageElement = null;
    switch (route) {
      case "/":
        console.log("creating page element");
        pageElement = document.createElement("display-all-research");
        break;
      case "/cart":
        break;
      default:
        if (route.startsWith("/study-")) {
          console.log("adding display study element");
          pageElement = document.createElement("display-study");
        }
        break;
    }

    // adds page based on route
    if (pageElement) {
      function changePage() {
        // get current page element
        const cache = document.getElementById("content");
        console.log(cache.children.length);
        document.getElementById("content").appendChild(pageElement);
      }

      if (!document.startViewTransition) {
        changePage();
      } else {
        document.startViewTransition(() => changePage());
      }

      window.scrollX = 0;
    } else {
      // 404 handler
      console.log("Error with page element");
    }
  },
};

export default Router;
