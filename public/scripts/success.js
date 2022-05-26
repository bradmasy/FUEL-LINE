const DELAY = 3000;

/**
 * Changes the page based on a succesful completion.
 */
function changePageOnSuccess() {
    setTimeout(() => {
        window.location.href = "/dashboard";

    }, DELAY)
}


changePageOnSuccess();
