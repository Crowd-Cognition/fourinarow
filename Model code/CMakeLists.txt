cmake_minimum_required(VERSION 3.14)
project(fourinarow)

if("${PROJECT_SOURCE_DIR}" STREQUAL "${PROJECT_BINARY_DIR}")
    message(FATAL_ERROR "In-source builds are not allowed. Please create a separate 'build' directory and build in there.")
endif()

set(CMAKE_CXX_STANDARD 20)
set(CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE "Debug")
endif()

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# windows needs "exported" symbols for linking
set(CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS ON)

# display many warnings during compilation
# they usually help you find some bugs
if(CMAKE_CXX_COMPILER_ID MATCHES "GNU|Clang|AppleClang")
    add_compile_options(-Wall -Wextra -Wconversion -pedantic -Wfatal-errors)
elseif(CMAKE_CXX_COMPILER_ID MATCHES "MSVC")
    add_compile_options(/W3 /WX)

    # so the dll files are alongside the executables
    # and the windows loader is happy (no more error 0xc0000135)
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)
endif()

#set(SOURCES Peak\ code/heuristic.cpp data_struct.cpp bfs.cpp features.cpp params.cpp)
set(SOURCES Peak\ code/heuristic.cpp data_struct.cpp bfs.cpp features.cpp params.cpp Peak\ code/bfs.cpp Peak\ code/features_all.cpp)
set(EXECUTABLE_NAME compute)
set(EXECUTABLE_NAME_2 gamma)
set(EXECUTABLE_NAME_3 csv_create)

set(LIBRARY_NAME heuristic)
add_library(${LIBRARY_NAME} ${SOURCES})
target_include_directories(${LIBRARY_NAME} PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
set_target_properties(${LIBRARY_NAME} PROPERTIES LINKER_LANGUAGE CXX)
target_compile_features(${LIBRARY_NAME} PUBLIC cxx_std_20)


set_target_properties(${LIBRARY_NAME} PROPERTIES LINKER_LANGUAGE CXX)

add_executable(${EXECUTABLE_NAME} planning_depth_new.cpp)
target_link_libraries(${EXECUTABLE_NAME} ${LIBRARY_NAME})

add_executable(${EXECUTABLE_NAME_2} params_printer.cpp)
target_link_libraries(${EXECUTABLE_NAME_2} ${LIBRARY_NAME})

add_executable(${EXECUTABLE_NAME_3} params_to_csv.cpp)
target_link_libraries(${EXECUTABLE_NAME_3} ${LIBRARY_NAME})


