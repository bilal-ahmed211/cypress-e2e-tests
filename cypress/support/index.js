import './commands';
import addContext from 'mochawesome/addContext';

// Cypress.on('test:after:run', (test, runnable)=>{
//     if(test.state === 'failed'){
//         const screenshot = `${Cypress.config('screenshotsFolder'+'/ecommerce')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title}(failed).png`
//         addContext({test}, screenshot);
//     }
// });
Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        let item = runnable
        const nameParts = [runnable.title]

        // Iterate through all parents and grab the titles
        while (item.parent) {
            nameParts.unshift(item.parent.title)
            item = item.parent
        }

        const fullTestName = nameParts
            .filter(Boolean)
            .join(' -- ')           // this is how cypress joins the test title fragments

        const imageUrl = `cypress/reports/moachreports/ecommerce/${
            Cypress.spec.name
            }/${fullTestName} (failed).png`

        addContext({ test }, imageUrl)
    }
})

