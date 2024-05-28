#include "Peak code/heuristic.h"
#include "data_struct.h"
//#include "params.cpp"
//#include "utils.h"

#include <fstream>
#include <ctime>

int main(int argc, const char* argv[]) {
    int n = atoi(argv[1]);
    auto select_params = peak::params[n];
    peak::heuristic h;
    h.get_params(select_params);
    cout<<h.gamma<<std::endl;
}
