#include <iostream>
#include <fstream>
#include "Peak code/heuristic.h"

// Function to check if a file exists
bool fileExists(const std::string& filename) {
    std::ifstream file(filename);
    return file.is_open();
}

// Function to count the number of lines in a file
int countLines(const std::string& filename) {
    std::ifstream file(filename);
    int count = 0;
    std::string line;
    while (std::getline(file, line)) {
        count++;
    }
    return count;
}

// Function to create a file and add a default line
void createFileWithDefaultLine(const std::string& filename, const std::string& defaultLine) {
    std::ofstream file(filename);
    file << defaultLine << std::endl;
}

int main() {
    int n = 200;
    fstream fout;
    fout.open("params.csv", ios::app);
//  Write title row
    fout << "Pruning Threshold,Gamma,Delta,Lapse Rate,Pass Coeff,Center Weight,Weight0,Weight1,Weight2,Weight3"<<std::endl;
    for (int i = 0; i < n; i++) {
        auto param = peak::params[i];
        for(int j = 0; j < 10; j++) {
            fout<<param[j];
            if (j < 9) fout<<",";
        }
        fout<<std::endl;
    }
    fout.close();
}