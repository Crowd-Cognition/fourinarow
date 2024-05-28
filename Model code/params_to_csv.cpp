#include <iostream>
#include "Peak code/heuristic.h"

int main() {
    int n = 200;
    fstream fout;
    fout.open("params.csv", ios::app | ios::app);
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