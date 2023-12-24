// Интерфейс для всех стратегий
interface ISortingStrategy {
    sort(data: number[]): number[];
}


// Конкретная стратегия: сортировка пузырьком
class BubbleSort implements ISortingStrategy {
    sort(data: number[]): number[] {
        console.log("Bubble Sort:");

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length + i - 1; j++) {
                if (data[j + 1] < data[j]) {
                    [data[j + 1], data[j]] = [data[j], data[j + 1]];
                }
            }
        }
        return data;
    }
}


// Конкретная стратегия: сортировка вставками
class InsertionSort implements ISortingStrategy {
    sort(data: number[]): number[] {
        console.log("Insertion Sort:");

        for (let i = 1; i < data.length; i++) {
            for (let j = i - 1; j > -1; j--) {
                if (data[j + 1] < data[j]) {
                    [data[j + 1], data[j]] = [data[j], data[j + 1]];
                }
            }
        }
        return data;
    }
}


// Конкретная стратегия: сортировка слиянием
class MergeSort implements ISortingStrategy {
    sort(data: number[]): number[] {
        console.log("Merge Sort:");
        return this.mergeSort(data);
    }

    private mergeSort(data: number[]): number[] {
        

        if (data.length <= 1) {
            return data;
        }
        let mid = Math.floor(data.length / 2);
        let left: number[] = this.mergeSort(data.slice(0, mid));
        let right: number[] = this.mergeSort(data.slice(mid));

        return this.merge(left, right);
    }

    private merge(list1: number[], list2: number[]): number[] {
        let merged: number[] = [],
            i: number = 0,
            j: number = 0;

        while (i < list1.length && j < list2.length) {
            if (list1[i] < list2[j]) {
                merged.push(list1[i]);
                i++;
            } else {
                merged.push(list2[j]);
                j++;
            }
        }
        while (i < list1.length) {
            merged.push(list1[i]);
            i++;
        }
        while (j < list2.length) {
            merged.push(list2[j]);
            j++;
        }
        return merged;
    }
}


// Класс контекста, который использует стратегию
class SorterContext {
    private sortingStrategy: ISortingStrategy;

    constructor(strategy: ISortingStrategy) {
        this.sortingStrategy = strategy;
    }

    performSort(data: number[]): number[] {
        return this.sortingStrategy.sort(data);
    }
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('Which algorithm do you want to use?\nBubbleSort - 1\nInsertion Sort - 2\nMerge Sort - 3\n', (answer) => {
    type strategies = Record<string, BubbleSort | InsertionSort | MergeSort>;
    const strategy: strategies = {
        "1": new BubbleSort(),
        "2": new InsertionSort(),
        "3": new MergeSort(),
    };

    if (!Object.keys(strategy).includes(answer)) {
        console.error("Incorrect number of algorithm. Please, use the numbers stated above\n");
        rl.close();
        return;
    }

    console.log(`\nYou are now in ${strategy[answer].constructor.name} strategy`);

    const dataToSort = [5, 2, 8, 1, 7, -1, -6, 23, 6, 7, 5];
    const sorter = new SorterContext(strategy[answer]);

    console.log(`Data array: [${dataToSort}]\n`)
    console.log(`[${sorter.performSort(dataToSort)}]`);

    rl.close();
});



