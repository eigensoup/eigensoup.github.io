---
title: "Classical Algorithms for Bipartite Quantum Max-Cut on Dense Expanders"
date: 2026-10-02
---

We give a polynomial-time classical randomized algorithm for the spin-½ antiferromagnetic Heisenberg model — equivalently, Quantum Max-Cut — on dense, balanced bipartite expanders. The algorithm estimates the ground energy and edge correlations to additive error ε in time polynomial in both the system size n and 1/ε.

### Exposition

Quantum Max-Cut asks for the ground state energy of the antiferromagnetic Heisenberg Hamiltonian on a graph — the natural quantum analogue of classical Max-Cut, and a touchstone problem for understanding how hard local Hamiltonians are to approximate classically. In general the problem is NP-hard to approximate past a certain threshold, so progress comes from identifying graph families where the energy landscape is tractable.

This paper identifies one such family: dense, balanced bipartite expanders. On these graphs, the key structural fact is that a *product of singlets* — a perfect matching of the complete bipartite graph, with each matched pair placed in a singlet state — is already a good approximation to the true ground state. That turns the quantum optimization problem into a *combinatorial* one: searching over perfect matchings instead of over the exponentially large Hilbert space.

The algorithm builds a Markov chain whose states are exactly these perfect matchings, and whose stationary distribution is weighted to favor low-energy matchings. The heavy lifting is showing that this chain mixes rapidly — that only a polynomial number of steps are needed to reach the ground state — and this is where the expansion property of the graph does its work: expansion controls the energy gaps between competing matchings well enough to rule out the chain getting stuck in bad local configurations. A polynomial number of samples from the resulting distribution then suffices to estimate both the ground energy and the two-point edge correlations to any desired additive accuracy.

The result sits alongside other recent classical algorithms for Quantum Max-Cut on structured graph families (bounded-degree graphs, random regular graphs), extending the reach of "classical simulability" results to dense bipartite expanders — a regime where the usual sum-of-squares and tensor-network approaches don't directly apply.

[Read Paper](https://arxiv.org/pdf/2610.03670)
