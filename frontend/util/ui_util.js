export const closeAncestorModal = e => {
    const selectedParent = (target) => {
        if (target.parentElement.classList.contains("selected")) {
            return target.parentElement
        }
        return selectedParent(target.parentElement)
    }
    selectedParent(e.target).classList.add("unselected");
    selectedParent(e.target).classList.remove("selected");
}

export const closeModalBackground = () => {
    let modals = document.getElementsByClassName("modal-true");
    for (let i = 0; i < modals.length; i++) {
        modals[i].classList.add("modal-false");
        modals[i].classList.remove("modal-true");
        
    }
}

export const openModalBackground = () => {
    let modals = document.getElementsByClassName("modal-false");
    for (let i = 0; i < modals.length; i++) {
        modals[i].classList.add("modal-true");
        modals[i].classList.remove("modal-false");
        
    }
}

export const toggleDropdowns = (e) => {

    const unselect = (target) => {
        target.classList.remove("selected");
        target.classList.add("unselected");
    }

    const select = (target) => {
        target.classList.remove("unselected");
        target.classList.add("selected");
    }

    const isDropdownChild = (target) => {
        if (!target.parentElement) return false
        if (target.parentElement.classList.contains("selected")) return true
        return isDropdownChild(target.parentElement)
    }

    const toggleOffTarget = (e) => {
        let selected = document.getElementsByClassName("selected");
        let pending = false
        if (isDropdownChild(e.target)) return
        if (e.target.classList.contains("unselected")) {
            pending = true
        }
        for (let i = 0; i < selected.length; i++) {
            unselect(selected[i]);
        }
        if (pending) select(e.target);

    }

    toggleOffTarget(e);
}