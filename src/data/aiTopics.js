const AI_TOPICS = [
  {
    id: 'ai-python',
    title: 'Python for AI/ML',
    icon: '🐍',
    notes: `## Python Essentials for AI/ML

\`\`\`python
# NumPy - Numerical Computing
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
matrix = np.zeros((3, 3))
dot_product = np.dot(a, b)
reshaped = arr.reshape(5, 1)

# Pandas - Data Manipulation
import pandas as pd
df = pd.read_csv('data.csv')
df.head()           # First 5 rows
df.describe()       # Statistics
df.isnull().sum()   # Missing values
df.groupby('col').mean()

# Matplotlib - Visualization
import matplotlib.pyplot as plt
plt.plot(x, y)
plt.scatter(x, y)
plt.hist(data, bins=30)
plt.show()
\`\`\`

### Key Libraries:
- **NumPy** — Arrays, linear algebra, random numbers
- **Pandas** — DataFrames, data cleaning, CSV/Excel handling
- **Matplotlib / Seaborn** — Plotting and visualization
- **Scikit-learn** — ML algorithms, preprocessing, metrics
- **TensorFlow / PyTorch** — Deep learning frameworks`,
    problems: [
      { id: 'ap1', title: 'NumPy array operations & broadcasting', difficulty: 'easy' },
      { id: 'ap2', title: 'Pandas DataFrame manipulation', difficulty: 'easy' },
      { id: 'ap3', title: 'Data cleaning (missing values, duplicates)', difficulty: 'easy' },
      { id: 'ap4', title: 'Matplotlib & Seaborn visualizations', difficulty: 'easy' },
      { id: 'ap5', title: 'Feature scaling (StandardScaler, MinMaxScaler)', difficulty: 'medium' },
      { id: 'ap6', title: 'One-Hot Encoding & Label Encoding', difficulty: 'easy' },
    ],
  },
  {
    id: 'ai-math',
    title: 'Math Foundations',
    icon: '📐',
    notes: `## Math for Machine Learning

### Linear Algebra
- **Vectors**: Direction + magnitude, dot product, cross product
- **Matrices**: Multiplication, transpose, inverse, determinant
- **Eigenvalues/Eigenvectors**: Used in PCA, dimensionality reduction
- Matrix decomposition: SVD, QR

### Calculus
- **Derivatives**: Rate of change — used in gradient descent
- **Partial derivatives**: Gradient = vector of partial derivatives
- **Chain rule**: Backbone of backpropagation
- **Gradient**: Points in direction of steepest ascent

### Probability & Statistics
- **Bayes' Theorem**: P(A|B) = P(B|A) × P(A) / P(B)
- **Distributions**: Normal, Bernoulli, Binomial, Poisson
- **Central Limit Theorem**: Sample means → normal distribution
- **Hypothesis Testing**: p-value, null hypothesis, confidence intervals
- **Correlation vs Causation**

### Key Formulas:
\`\`\`
MSE = (1/n) × Σ(y_actual - y_predicted)²
Sigmoid = 1 / (1 + e^(-x))
Softmax = e^(xi) / Σe^(xj)
Cross-Entropy = -Σ y × log(ŷ)
\`\`\``,
    problems: [
      { id: 'am1', title: 'Vectors & matrix operations', difficulty: 'easy' },
      { id: 'am2', title: 'Dot product & matrix multiplication', difficulty: 'easy' },
      { id: 'am3', title: 'Derivatives & chain rule', difficulty: 'medium' },
      { id: 'am4', title: 'Probability distributions', difficulty: 'medium' },
      { id: 'am5', title: 'Bayes Theorem applications', difficulty: 'medium' },
      { id: 'am6', title: 'Eigenvalues & PCA intuition', difficulty: 'hard' },
    ],
  },
  {
    id: 'ai-supervised',
    title: 'Supervised Learning',
    icon: '🎯',
    notes: `## Supervised Learning

### Regression (Continuous output)
\`\`\`python
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.metrics import mean_squared_error, r2_score

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)
rmse = mean_squared_error(y_test, predictions, squared=False)
\`\`\`

### Classification (Discrete output)
\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, f1_score, classification_report

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
print(classification_report(y_test, model.predict(X_test)))
\`\`\`

### Key Algorithms:
- **Linear Regression** — straight-line fit, minimizes MSE
- **Logistic Regression** — binary classification with sigmoid
- **Decision Tree** — splits on feature thresholds
- **Random Forest** — ensemble of decision trees (bagging)
- **XGBoost / Gradient Boosting** — sequential tree building
- **SVM** — finds optimal separating hyperplane
- **KNN** — classifies based on nearest neighbors

### Evaluation Metrics:
- **Accuracy** = correct / total (misleading for imbalanced data)
- **Precision** = TP / (TP + FP) — "of predicted positives, how many correct?"
- **Recall** = TP / (TP + FN) — "of actual positives, how many found?"
- **F1-Score** = 2 × (Precision × Recall) / (Precision + Recall)
- **ROC-AUC** — area under ROC curve, threshold-independent`,
    problems: [
      { id: 'as1', title: 'Linear Regression implementation', difficulty: 'easy' },
      { id: 'as2', title: 'Logistic Regression & sigmoid function', difficulty: 'easy' },
      { id: 'as3', title: 'Decision Trees & information gain', difficulty: 'medium' },
      { id: 'as4', title: 'Random Forest vs Gradient Boosting', difficulty: 'medium' },
      { id: 'as5', title: 'SVM & kernel trick', difficulty: 'medium' },
      { id: 'as6', title: 'Cross-validation (k-fold)', difficulty: 'medium' },
      { id: 'as7', title: 'Precision, Recall, F1, ROC-AUC', difficulty: 'medium' },
      { id: 'as8', title: 'Hyperparameter tuning (GridSearch, RandomSearch)', difficulty: 'medium' },
      { id: 'as9', title: 'Handle class imbalance (SMOTE, class weights)', difficulty: 'hard' },
    ],
  },
  {
    id: 'ai-unsupervised',
    title: 'Unsupervised Learning',
    icon: '🔮',
    notes: `## Unsupervised Learning

### Clustering
\`\`\`python
from sklearn.cluster import KMeans, DBSCAN
from sklearn.metrics import silhouette_score

kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(X)
score = silhouette_score(X, labels)
\`\`\`

### Dimensionality Reduction
\`\`\`python
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)
print(f"Explained variance: {pca.explained_variance_ratio_}")
\`\`\`

### Key Algorithms:
- **K-Means** — partition into K clusters (centroid-based)
- **DBSCAN** — density-based clustering (finds arbitrary shapes)
- **Hierarchical Clustering** — builds tree of clusters (dendrogram)
- **PCA** — linear dimensionality reduction via eigenvalues
- **t-SNE** — non-linear, great for visualization
- **Association Rules** — Apriori algorithm (market basket analysis)

### When to use what:
- Known number of clusters → **K-Means**
- Unknown clusters, noisy data → **DBSCAN**
- Too many features → **PCA** for reduction
- Visualizing high-dim data → **t-SNE**`,
    problems: [
      { id: 'au1', title: 'K-Means clustering implementation', difficulty: 'easy' },
      { id: 'au2', title: 'Elbow method for optimal K', difficulty: 'easy' },
      { id: 'au3', title: 'DBSCAN vs K-Means comparison', difficulty: 'medium' },
      { id: 'au4', title: 'PCA for dimensionality reduction', difficulty: 'medium' },
      { id: 'au5', title: 't-SNE visualization', difficulty: 'medium' },
      { id: 'au6', title: 'Silhouette score evaluation', difficulty: 'medium' },
    ],
  },
  {
    id: 'ai-pipeline',
    title: 'ML Pipeline & Feature Engineering',
    icon: '⚙️',
    notes: `## End-to-End ML Pipeline

### 1. Data Collection & EDA
\`\`\`python
# Exploratory Data Analysis
df.info()                    # Data types, non-null counts
df.describe()                # Statistical summary
df.corr()                    # Correlation matrix
sns.heatmap(df.corr())       # Visual correlation
\`\`\`

### 2. Data Preprocessing
\`\`\`python
# Handle missing values
df.fillna(df.mean(), inplace=True)    # Fill with mean
df.dropna(subset=['important_col'])    # Drop rows

# Feature scaling
from sklearn.preprocessing import StandardScaler, MinMaxScaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Encoding categorical variables
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
le = LabelEncoder()
df['category'] = le.fit_transform(df['category'])
\`\`\`

### 3. Feature Engineering
- **Feature Selection**: SelectKBest, RFE, feature importance
- **Feature Creation**: Polynomial features, date extraction, binning
- **Handling Outliers**: IQR method, Z-score

### 4. Train/Test Split
\`\`\`python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
\`\`\`

### 5. Model Selection → Training → Evaluation → Deployment`,
    problems: [
      { id: 'af1', title: 'EDA with Pandas & Seaborn', difficulty: 'easy' },
      { id: 'af2', title: 'Handle missing data strategies', difficulty: 'easy' },
      { id: 'af3', title: 'Feature scaling (when & why)', difficulty: 'easy' },
      { id: 'af4', title: 'Feature selection techniques', difficulty: 'medium' },
      { id: 'af5', title: 'Train/test split & stratification', difficulty: 'easy' },
      { id: 'af6', title: 'Bias-Variance tradeoff', difficulty: 'medium' },
      { id: 'af7', title: 'Overfitting vs Underfitting solutions', difficulty: 'medium' },
    ],
  },
  {
    id: 'ai-deep-learning',
    title: 'Deep Learning & Neural Networks',
    icon: '🧠',
    notes: `## Deep Learning Fundamentals

### Neural Network Architecture
\`\`\`
Input Layer → Hidden Layers → Output Layer

Neuron: z = w·x + b → a = activation(z)
\`\`\`

### Key Concepts:
- **Perceptron**: Single neuron — weighted sum + activation
- **Activation Functions**: ReLU, Sigmoid, Tanh, Softmax, Leaky ReLU
- **Forward Propagation**: Input → layers → output
- **Backpropagation**: Chain rule to compute gradients
- **Gradient Descent**: Update weights: w = w - lr × ∂Loss/∂w
- **Learning Rate**: Too high = diverge, too low = slow

### Loss Functions:
- **MSE**: Regression
- **Binary Cross-Entropy**: Binary classification
- **Categorical Cross-Entropy**: Multi-class classification

### Optimizers:
- **SGD**: Basic gradient descent
- **Adam**: Adaptive learning rate (most popular)
- **RMSprop**: Good for RNNs

### Regularization:
- **Dropout**: Randomly drop neurons during training
- **L1/L2 Regularization**: Penalize large weights
- **Batch Normalization**: Normalize layer inputs
- **Early Stopping**: Stop when validation loss increases

\`\`\`python
import tensorflow as tf
from tensorflow import keras

model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(n_features,)),
    keras.layers.Dropout(0.3),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(num_classes, activation='softmax')
])

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

model.fit(X_train, y_train, epochs=50, batch_size=32,
          validation_split=0.2)
\`\`\``,
    problems: [
      { id: 'ad1', title: 'Perceptron & activation functions', difficulty: 'easy' },
      { id: 'ad2', title: 'Forward & backward propagation', difficulty: 'medium' },
      { id: 'ad3', title: 'Gradient descent & learning rate', difficulty: 'medium' },
      { id: 'ad4', title: 'Build a neural network with Keras/TF', difficulty: 'medium' },
      { id: 'ad5', title: 'Loss functions & optimizers', difficulty: 'medium' },
      { id: 'ad6', title: 'Dropout & regularization', difficulty: 'medium' },
      { id: 'ad7', title: 'Batch Normalization', difficulty: 'medium' },
      { id: 'ad8', title: 'Vanishing/Exploding gradients', difficulty: 'hard' },
    ],
  },
  {
    id: 'ai-cnn',
    title: 'CNNs — Computer Vision',
    icon: '👁️',
    notes: `## Convolutional Neural Networks

### Architecture:
\`\`\`
Input Image → [Conv → ReLU → Pool] × N → Flatten → Dense → Output
\`\`\`

### Key Layers:
- **Conv2D**: Applies filters/kernels to detect features (edges, textures)
- **MaxPooling**: Downsamples — reduces spatial dimensions
- **Flatten**: Converts 2D feature maps to 1D vector
- **Dense**: Fully connected layer for classification

### Popular Architectures:
- **LeNet-5**: Early CNN (digit recognition)
- **AlexNet**: Deep CNN that won ImageNet 2012
- **VGG-16/19**: Very deep, uniform architecture
- **ResNet**: Skip connections (50, 101, 152 layers)
- **Inception/GoogLeNet**: Multi-scale feature extraction
- **EfficientNet**: Best accuracy/efficiency tradeoff
- **YOLO**: Real-time object detection

### Transfer Learning:
\`\`\`python
base_model = tf.keras.applications.ResNet50(
    weights='imagenet', include_top=False, input_shape=(224,224,3)
)
base_model.trainable = False  # Freeze pretrained layers
# Add custom classifier head on top
\`\`\`

### Applications:
- Image Classification, Object Detection, Segmentation
- Face Recognition, Medical Imaging, Self-driving Cars`,
    problems: [
      { id: 'ac1', title: 'Convolution operation & filters', difficulty: 'easy' },
      { id: 'ac2', title: 'Build a CNN for image classification', difficulty: 'medium' },
      { id: 'ac3', title: 'MaxPooling vs AveragePooling', difficulty: 'easy' },
      { id: 'ac4', title: 'Transfer learning with ResNet/VGG', difficulty: 'medium' },
      { id: 'ac5', title: 'Data augmentation techniques', difficulty: 'medium' },
      { id: 'ac6', title: 'Object detection (YOLO basics)', difficulty: 'hard' },
    ],
  },
  {
    id: 'ai-nlp',
    title: 'NLP — Natural Language Processing',
    icon: '💬',
    notes: `## Natural Language Processing

### Text Preprocessing:
\`\`\`python
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

text = "The cats were running quickly"
tokens = word_tokenize(text.lower())
filtered = [w for w in tokens if w not in stopwords.words('english')]
# Stemming: running → run
# Lemmatization: cats → cat (more accurate)
\`\`\`

### Text Representation:
- **Bag of Words (BoW)**: Count word occurrences
- **TF-IDF**: Term Frequency × Inverse Document Frequency
- **Word2Vec**: Dense word embeddings (Word → Vector)
- **GloVe**: Global vectors for word representation
- **BERT Embeddings**: Contextual embeddings

### Key Models:
- **RNN/LSTM**: Sequential processing (older approach)
- **Transformers**: Self-attention mechanism (modern)
- **BERT**: Bidirectional encoder (understanding)
- **GPT**: Generative Pre-trained Transformer
- **Legal-BERT**: Domain-specific (your ISB project!)

### NLP Tasks:
- Sentiment Analysis, Named Entity Recognition (NER)
- Text Classification, Machine Translation
- Question Answering, Text Summarization
- Chatbots (your Gemini integration!)

### Transformer Architecture:
\`\`\`
Input → Embedding + Positional Encoding
→ Multi-Head Self-Attention
→ Feed-Forward Network
→ Layer Normalization
→ Output
\`\`\``,
    problems: [
      { id: 'an1', title: 'Tokenization & stopword removal', difficulty: 'easy' },
      { id: 'an2', title: 'Bag of Words & TF-IDF', difficulty: 'easy' },
      { id: 'an3', title: 'Word2Vec & word embeddings', difficulty: 'medium' },
      { id: 'an4', title: 'Sentiment analysis with ML', difficulty: 'medium' },
      { id: 'an5', title: 'RNN/LSTM for sequence tasks', difficulty: 'medium' },
      { id: 'an6', title: 'Transformer & self-attention mechanism', difficulty: 'hard' },
      { id: 'an7', title: 'BERT fine-tuning for classification', difficulty: 'hard' },
      { id: 'an8', title: 'Named Entity Recognition (NER)', difficulty: 'medium' },
    ],
  },
  {
    id: 'ai-genai',
    title: 'Generative AI & LLMs',
    icon: '🤖',
    notes: `## Generative AI & Large Language Models

### Key Concepts:
- **LLM**: Large Language Model — trained on massive text data
- **Tokenization**: Breaking text into tokens (subwords)
- **Pre-training**: Learn language patterns from unlabeled data
- **Fine-tuning**: Adapt pre-trained model to specific task
- **Prompt Engineering**: Crafting inputs for best outputs
- **RAG**: Retrieval-Augmented Generation — combine LLM with knowledge base

### Popular Models:
- **GPT-4/4o**: OpenAI's generative model
- **Gemini**: Google's multimodal model (you used it in Vertical Eden!)
- **Claude**: Anthropic's assistant
- **LLaMA**: Meta's open-source LLM
- **Mistral**: Efficient open-source models

### Prompt Engineering:
\`\`\`
# Zero-shot: Direct question
"Classify this review as positive or negative: ..."

# Few-shot: Provide examples
"Review: Great product! → Positive
Review: Terrible quality → Negative
Review: Works fine → ?"

# Chain-of-thought: Step-by-step reasoning
"Let's think step by step..."

# System prompts: Set behavior/role
"You are a helpful coding assistant..."
\`\`\`

### APIs:
\`\`\`python
# OpenAI API
import openai
response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

# Google Gemini API
import google.generativeai as genai
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content("Hello!")
\`\`\`

### Key Concepts:
- **Temperature**: Controls randomness (0 = deterministic, 1 = creative)
- **Top-k / Top-p**: Sampling strategies
- **Hallucination**: Model generates incorrect but confident-sounding text
- **Context Window**: Maximum tokens the model can process`,
    problems: [
      { id: 'ag1', title: 'Understand tokenization & embeddings', difficulty: 'easy' },
      { id: 'ag2', title: 'Prompt engineering techniques', difficulty: 'easy' },
      { id: 'ag3', title: 'Use OpenAI/Gemini API', difficulty: 'medium' },
      { id: 'ag4', title: 'Fine-tuning vs RAG comparison', difficulty: 'medium' },
      { id: 'ag5', title: 'Build a chatbot with LLM API', difficulty: 'medium' },
      { id: 'ag6', title: 'RAG implementation basics', difficulty: 'hard' },
      { id: 'ag7', title: 'LangChain / LlamaIndex frameworks', difficulty: 'hard' },
    ],
  },
  {
    id: 'ai-projects',
    title: 'AI/ML Project Checklist',
    icon: '🚀',
    notes: `## Your AI/ML Project Experience

### ISB Internship Projects:
1. **NLP Judgment Analysis** — Legal-BERT, case classification
2. **Loan Defaulter Prediction** — Random Forest, XGBoost, SMOTE
3. **Data Scraping Pipeline** — Selenium automation

### Portfolio-Worthy Project Ideas:
- Image classifier with transfer learning
- Sentiment analysis on Twitter/product reviews
- Recommendation system (collaborative filtering)
- Chatbot using RAG + LangChain
- Stock price prediction with LSTM
- Resume parser using NER
- AI-powered code reviewer`,
    problems: [
      { id: 'aj1', title: 'Explain Legal-BERT project end-to-end', difficulty: 'medium' },
      { id: 'aj2', title: 'Explain loan defaulter model (RF, XGBoost)', difficulty: 'medium' },
      { id: 'aj3', title: 'SMOTE & class imbalance handling', difficulty: 'medium' },
      { id: 'aj4', title: 'Selenium data scraping pipeline', difficulty: 'easy' },
      { id: 'aj5', title: 'Build a new ML project end-to-end', difficulty: 'hard' },
      { id: 'aj6', title: 'Deploy ML model (Flask/FastAPI + Docker)', difficulty: 'hard' },
    ],
  },
];

export default AI_TOPICS;
