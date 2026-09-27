#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int alter;

public:
    Person(const std::string& personenName, int personenAlter)
        : name(personenName), alter(personenAlter) {
        std::cout << "Konstruktor: " << name
                  << ", Alter: " << alter << '\n';
    }

    ~Person() {
        std::cout << "Destruktor: " << name
                  << ", Alter: " << alter << '\n';
    }
};

void stackBeispiel() {
    std::cout << "\n--- Person auf dem Stack ---\n";

    Person person("Anna", 25);

    std::cout << "Die Person lebt jetzt auf dem Stack.\n";
    std::cout << "Beim Verlassen der Funktion wird sie automatisch zerstört.\n";
}

void heapBeispiel() {
    std::cout << "\n--- Person auf dem Heap ---\n";

    Person* person = new Person("Ben",  30);

    std::cout << "Die Person lebt jetzt auf dem Heap.\n";
    std::cout << "Sie wird mit delete freigegeben.\n";

    delete person;

    std::cout << "Die Person wurde zerstört.\n";
}

int main() {
    std::cout << "Programmstart\n";

    stackBeispiel();

    std::cout << "\nZurück in main().\n";

    heapBeispiel();

    std::cout << "\nProgrammende\n";

    return 0;
}
