let dropdownItems = document.querySelectorAll(".dropdown-item");

let selectedTags = [];
let hiddenInput = document.querySelector("#hidden-tags-inp");

dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
        let tag = this.textContent;

        if (selectedTags.length >= 3) {
            let navbar = document.querySelector(".navbar");
            let alertDiv = document.createElement("div");
            let closeBtn = document.createElement("button");
            alertDiv.className =
                "alert alert-danger alert-dismissible fade show mt-3 col-6 offset-3";
            alertDiv.setAttribute("role", "alert");
            alertDiv.textContent = "You can only select up to 3 tags!";
            closeBtn.type = "button";
            closeBtn.className = "btn-close";
            closeBtn.setAttribute("data-bs-dismiss", "alert");
            closeBtn.setAttribute("aria-label", "Close");
            alertDiv.appendChild(closeBtn);
            navbar.insertAdjacentElement("afterend", alertDiv);
            return;
        }

        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
        }

        hiddenInput.value = selectedTags.join(",");

        let tagsDisplay = document.querySelector(".tags-display");

        tagsDisplay.innerHTML = "";

        selectedTags.forEach(function (tag) {
            let badge = document.createElement("span");
            badge.className = "badge rounded-pill text-bg-danger";
            badge.textContent = tag;

            let cancel = document.createElement("button");
            cancel.type = "button";
            cancel.className = "btn-close tag-remove-btn";
            cancel.setAttribute("aria-label", "Close");

            badge.appendChild(cancel);
            tagsDisplay.appendChild(badge);

            cancel.addEventListener("click", function (event) {
                event.stopPropagation();
                let index = selectedTags.indexOf(tag);
                if (index !== -1) {
                    selectedTags.splice(index, 1);
                }
                hiddenInput.value = selectedTags.join(",");
                badge.remove();
            });
        });
    });
});

window.addEventListener("DOMContentLoaded", (event) => {
    let url = new URL(window.location.href);
    let selectedFilterText = decodeURIComponent(url.pathname.split("/").pop());
    if (selectedFilterText) {
        let filters = document.querySelectorAll("#filters .filter");
        filters.forEach((filter) => {
            if (filter.textContent.trim() === selectedFilterText) {
                filter.classList.add("selected-filter");
            }
        });
    }
});
