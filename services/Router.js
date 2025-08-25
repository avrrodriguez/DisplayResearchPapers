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
      const cache = document.getElementById("content");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      // 404 handler
    }
  },
};

export default Router;
