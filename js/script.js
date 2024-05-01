const keysList =[...document.querySelectorAll('.calc-keys > div')]
const display = document.querySelector('.display')

function addElement(content) {
    const p = document.createElement('p')
    const text = document.createTextNode(content)
    p.appendChild(text)

    display.appendChild(p)
}

function deleteElement(displayElement) {
    for(let text of [...displayElement.children]) {
        displayElement.removeChild(text)
    }
}

function deleteLastElement(displayElement, lastElement, displayElements) {
    if(displayElements.length > 0) {
        displayElement.removeChild(lastElement)
    }
}

function changeOperator(displayList) {
    let operation = ''

    for(let displayText of displayList) {
        if(displayText.textContent == 'x') {
            operation += '*'
        }

        else if(displayText.textContent == '÷') {
            operation += '/'
        }

        else if(displayText.textContent == ',') {
            operation += '.'
        }

        else if(displayText.textContent == '%') {
            operation += '/100'
        }

        else if(displayText.textContent == '^') {
            operation += '**'
        }

        else {
            operation += displayText.textContent
        }
        
    }

    return operation
}

function resolveAccount(displayList, displayElement) {
    let result = eval((changeOperator(displayList)))

    deleteElement(displayElement)

    addElement(result)
}

function displayValidation(clickContent, key, displayList, lastDisplayElement) {
    let validation = true
    let operatorValidation = /[x%^÷+-,]/
    
    if(displayList.length == 0 && operatorValidation.test(clickContent)) {
        validation = false
    }

    if(displayList.length != 0 && operatorValidation.test(lastDisplayElement.textContent) && key != 'num' && operatorValidation.test(clickContent)) {
        validation = false
    }

    if(!operatorValidation.test(clickContent) && key != 'num' && operatorValidation.test(lastDisplayElement.textContent)) {
        validation = false
    }

    return validation
}

function addDisplay(keyValue) {
    const keyContainer = keyValue.target
    const keyContainerText = keyContainer.textContent
    const keyClass = keyContainer.className

    let displayContentList = []

    displayContentList = [...display.children]
    const lastItemDisplayContentList = displayContentList[displayContentList.length-1]

    let resultDisplayValidation = displayValidation(keyContainerText, keyClass, displayContentList, lastItemDisplayContentList)

    if(keyClass != 'delete-all-container' && keyClass != 'equal' && keyClass != 'delete' && resultDisplayValidation) {
        addElement(keyContainerText)
    }

    if(keyClass == 'equal' && resultDisplayValidation) {
        resolveAccount(displayContentList, display)
    }

    else if(keyClass == 'delete-all') {
        deleteElement(display)
    }

    else if(keyClass == 'delete') {
        deleteLastElement(display, lastItemDisplayContentList, displayContentList)
    }
}

keysList.forEach((key) => {
    key.addEventListener('click', addDisplay)
})
