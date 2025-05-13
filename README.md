# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

- Held-Karp always finds a tour that is shorter or equal to the tour length found by Local Search because it guarantees an optimal solution. It extensively evaluates all alternative routes and selects the one with the shortest total distance.

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

To calculate the data, I tested two methods, Held-Karp and Local Search, on randomly generated distance matrices for differing numbers of cities (n). For each input size, I measured each algorithm's runtime and the duration of the tour discovered by it. The experiments were done three times for each input size, with the results then averaged. Finally, the data was then collected and evaluated to assess the algorithms' performance in terms of time and solution quality.

Graphs:
![Timegraph](https://github.com/user-attachments/assets/d8b9665c-f8af-4b78-8305-87e5749ff05f)
![Tourgraph](https://github.com/user-attachments/assets/14ea6623-3bf5-40bf-86e1-44909190cf3a)
![Graph1](https://github.com/user-attachments/assets/540875e7-1b3e-4a88-a2ec-1685c8562792)



“I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.”

For this assignment, I recieved help from Chat GPT in how to set up my code for tests and how to export the data for viewing. 
